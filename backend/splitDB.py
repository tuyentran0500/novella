import json
from sklearn.model_selection import train_test_split

# Specify the path to your JSONL file
input_file_path = 'littleprince.jsonl'
output_train_file_path = 'train_data.jsonl'
output_validation_file_path = 'validation_data.jsonl'

# Read the JSONL file
with open(input_file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()

# Split the data into training and validation sets
train_data, validation_data = train_test_split(lines, test_size=0.2, random_state=42)

# Write the training data to a new file
with open(output_train_file_path, 'w', encoding='utf-8') as train_file:
    train_file.writelines(train_data)

# Write the validation data to a new file
with open(output_validation_file_path, 'w', encoding='utf-8') as validation_file:
    validation_file.writelines(validation_data)
