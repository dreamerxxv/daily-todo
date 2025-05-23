package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	// "github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Icon      string             `json:"icon"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

var collection *mongo.Collection

func main() {

	if os.Getenv("ENV") != "production" {
		// Load the .env file if not in production
		err := godotenv.Load()
		if err != nil {
			log.Println("Error loading .env file:", err)
		}
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB Atlas")

	collection = client.Database("todogo_db").Collection("todos")
	app := fiber.New()

	// app.Use(cors.New(cors.Config {
	// 	AllowOrigins: "http://localhost:5173",
	// 	AllowHeaders: "Origin,Content-Type,Accept",
	// 	AllowMethods: "GET,POST,PUT,DELETE,PATCH",
	// }))

	app.Get("/api/todos", getTodos)

	app.Get("/api/alltodos", getAllTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./client/dist")
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))
}


// Get all todos from database MongoDB
func getAllTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}

	for cursor.Next(context.Background()) {
		var todo Todo

		if err := cursor.Decode(&todo); err != nil {
			return err
		}

		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

// Get todos for today
func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	// Get the current date (only date, without time)
	now := time.Now()
	startOfDay := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
	endOfDay := startOfDay.Add(24 * time.Hour)

	// Filter only data with CreatedAt between startOfDay and endOfDay
	filter := bson.M{
		"createdAt": bson.M{
			"$gte": startOfDay,
			"$lt":  endOfDay,
		},
	}

	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}

	for cursor.Next(context.Background()) {
		var todo Todo

		if err := cursor.Decode(&todo); err != nil {
			return err
		}

		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

// Create a new todo from database MongoDB
func createTodo(c *fiber.Ctx) error {
	todo := new(Todo)
	todo.CreatedAt = time.Now().UTC()

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"msg": "Body is required!"})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

// Update a todo from database MongoDB
func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"msg": "Invalid ID!"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}

// Delete a todo from database MongoDB
func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
