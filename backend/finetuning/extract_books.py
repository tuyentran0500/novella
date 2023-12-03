from ebooklib import epub
import os

def extract_chapters(epub_file):
    book = epub.read_epub(epub_file)
    
    # Create a directory to store the text files
    output_dir = os.path.splitext(epub_file)[0] + "_chapters"
    os.makedirs(output_dir, exist_ok=True)
    
    # Iterate through the items in the EPUB book
    for i, item in enumerate(book.get_items()):
        if isinstance(item, epub.EpubHtml):
            # Extract content from the HTML item
            content = item.content.decode('utf-8')
            
            # Remove HTML tags to get plain text content
            content = ' '.join(content.split())
            
            # Save content to a text file
            chapter_filename = os.path.join(output_dir, f"chapter_{i+1}.txt")
            with open(chapter_filename, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Chapter {i+1} saved to {chapter_filename}")

if __name__ == "__main__":
    # Replace 'your_book.epub' with the path to your EPUB file
    epub_file_path = 'De Botton, Alain - On Love-Grove_Atlantic, Inc._Grove Press (2016_2015).epub'
    extract_chapters(epub_file_path)
