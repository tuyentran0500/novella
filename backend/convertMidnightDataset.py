import json

# Input and output file paths
input_file_path = 'littleprince.jsonl'
output_file_path = 'output2.jsonl'

# Read the input jsonl file
with open(input_file_path, 'r', encoding="utf-8") as infile:
    # Load each JSON object from the file
    data_list = [json.loads(line) for line in infile]

# Function to replace unicode characters
def replace_unicode_chars(content):
    content = content.replace('\u2019', "'")  # Replace right single quotation mark
    content = content.replace('\u2018', "'")  # Replace left single quotation mark
    return content

# Iterate through each object in the list
for i in range(len(data_list)):
    # Check if the current object has at least three messages
    if len(data_list[i]['messages']) >= 3:
        # Extract content from the assistant and user messages
        assistant_content = replace_unicode_chars(data_list[i]['messages'][1]['content'])
        user_content = replace_unicode_chars(data_list[i]['messages'][2]['content'])

        # Create a new combined object
        combined_object = {
            "role": "user",
            "content": f"Outline: {assistant_content}. Request: {user_content}"
        }

        # Remove the second and third objects from the "messages" array
        data_list[i]['messages'] = data_list[i]['messages'][:1] + [combined_object] + data_list[i]['messages'][3:]

# Write the modified data to the output jsonl file
with open(output_file_path, 'w', encoding="utf-8") as outfile:
    # Write each modified JSON object to the file
    for data in data_list:
        outfile.write(json.dumps(data, ensure_ascii=False) + '\n')
