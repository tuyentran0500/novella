import json

input_file_path = 'novel.jsonl'
training_output_file_path = 'train_novel.jsonl'
validation_output_file_path = 'valid_novel.jsonl'
def create_messages(data):
    return [
        {"role": "system", "content": "You are a master novel writer"},
        {"role": "user", "content": data["prompt"]},
        {"role": "assistant", "content": data["completion"]}
    ]
# Load the data from the input file
data = []
with open(input_file_path, 'r') as input_file:
    for line in input_file:
        data.append(json.loads(line))

# Define the pattern for training and validation
pattern = [4, 1]

# Create output files for training and validation
train_output_data = []
valid_output_data = []

for i, entry in enumerate(data):
    messages = {"messages": create_messages(entry)}

    if i % sum(pattern) < pattern[0]:
        # Add to training data
        train_output_data.append(messages)
    else:
        # Add to validation data
        valid_output_data.append(messages)

# Write to training output file
with open(training_output_file_path, 'w') as train_output_file:
    for entry in train_output_data:
        train_output_file.write(json.dumps(entry) + '\n')

# Write to validation output file
with open(validation_output_file_path, 'w') as valid_output_file:
    for entry in valid_output_data:
        valid_output_file.write(json.dumps(entry) + '\n')



        # messages = [
        #     {"role": "system", "content": "You are a master novel writer"},
        #     {"role": "user", "content": data["prompt"]},
        #     {"role": "assistant", "content": data["completion"]}
        # ]