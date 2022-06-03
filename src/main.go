package main

// Main function is the entry point of a go program.
// (required)
func main() {}

//export add
func add(a int32, b int32) int32 {
	return a + b
}
