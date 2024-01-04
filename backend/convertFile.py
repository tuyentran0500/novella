def convert_file(input_file, output_file):
    with open(input_file, 'r', encoding="utf-8")  as infile:
        content = infile.read()

    # Convert newlines to '\n'
    content = content.replace('\n', '\\n')

    # Replace double quotes with single quotes
    content = content.replace('"', "'")

    with open(output_file, 'w', encoding="utf-8") as outfile:
        outfile.write(content)

# Example usage:
input_filename = 'chapter.txt'
output_filename = 'output.txt'

convert_file(input_filename, output_filename)