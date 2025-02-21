package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/gofiber/fiber/v2"
)

type Book struct {
	ID 		  int 		`json:"id"`
	Completed bool 		`json:"completed"`
	Body 	  string 	`json:"body"`
}

func api() {
	fmt.Println("Hello, World")
	app := fiber.New()
	books := []Book{}

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")

	// Get data from API
	app.Get("/api/books", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(books)
	})

	// Post data to API
	app.Post("/api/books", func(c *fiber.Ctx) error {
		todo := &Book{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{ "msg": "Body is required!" })
		}

		// Generate ID and Add to books
		todo.ID = len(books) + 1
		books = append(books, *todo)
  
		return c.Status(201).JSON(todo)
	})

	// Update data from API
	app.Patch("/api/books/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range books {
			if fmt.Sprint(todo.ID) == id {
				books[i].Completed = true
				return c.Status(200).JSON(books[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{ "msg": "Todo not found!" })
	})

	// Delete data from API
	app.Delete("/api/books/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range books {
			if fmt.Sprint(todo.ID) == id {
				books = append(books[:i], books[i+1:]...)
				return c.Status(200).JSON(fiber.Map{ "success": true })
			}
		}

		return c.Status(404).JSON(fiber.Map{ "error": "Book not found!" })
	})

	log.Fatal(app.Listen(":" + PORT))
		
}