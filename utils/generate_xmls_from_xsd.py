import xmlschema
from xml.etree.ElementTree import Element, SubElement, tostring
import xml.dom.minidom
import random
import nltk
from nltk.corpus import words
import time
import string

def write_header_data(xml_root, RANDOM_TRANSACTION_ID):
    header_data = SubElement(xml_root, 'HeaderData')
    transaction_id = SubElement(header_data, 'TransactionID')
    transaction_id.text = str(RANDOM_TRANSACTION_ID)
    return xml_root

def write_images_data(product_information):
    product_images = SubElement(product_information, 'ProductImages')
    NUMBER_OF_IMAGES_TO_GENERATE = generate_random_number(1,10)

    for index in range(NUMBER_OF_IMAGES_TO_GENERATE):
        product_image = SubElement(product_images, 'Image')
        product_image.text = 'image_url_' + str(index)
    # Add more product images here
    return product_information

def generate_roundel(product_information):
    EMPTY_ROUNDELS = 65
    roundel_list = ['Up to 60% sale', 'Buy one get one free', 'Last chance']
    roundel_list += [' '] * EMPTY_ROUNDELS
    product_roundel = SubElement(product_information, 'ProductRoundel')
    product_roundel.text = str(random.choice(roundel_list))

def generate_product_name(PRODUCT_WORDS):
    # Randomly select words to form the product name
    return ' '.join(random.sample(PRODUCT_WORDS, random.randint(2, 4)))

def generate_product_description(PRODUCT_WORDS):
    # Randomly select words to form the product name
    return ' '.join(random.sample(PRODUCT_WORDS, random.randint(10, 35)))

def write_product_data(xml_root, RANDOM_PRODUCT_ID,PRODUCT_WORDS):
    product_data = SubElement(xml_root, 'ProductData')
    product_id = SubElement(product_data, 'ProductID')
    product_id.text = str(RANDOM_PRODUCT_ID)

    product_information = SubElement(product_data, 'ProductInformation')
    product_name = SubElement(product_information, 'ProductName')
    product_name.text = generate_product_name(PRODUCT_WORDS)

    product_description = SubElement(product_information, 'ProductDescription')
    product_description.text = generate_product_description(PRODUCT_WORDS)

    product_information = write_images_data(product_information)

    product_information = generate_roundel(product_information)

    return xml_root


def write_sku_data(xml_root,PRODUCT_WORDS):
    sku_data = SubElement(xml_root, 'SKUData')

    # SKU
    sku = SubElement(sku_data, 'SKU')
    sku_number = SubElement(sku, 'SKUNumber')
    sku_number.text = generate_random_string(7)

    sku_name = SubElement(sku, 'SKUName')
    sku_name.text = generate_product_name(PRODUCT_WORDS)

    sku_description = SubElement(sku, 'SKUDescription')
    sku_description.text = generate_product_description(PRODUCT_WORDS)

    sku_price = SubElement(sku, 'SKUPrice')
    amount = SubElement(sku_price, 'Amount')
    amount.text = '10.99'

    currency_code = SubElement(sku_price, 'CurrencyCode')
    currency_code.text = 'USD'

    # Add other elements in SKUPrice as needed

    sku_images = SubElement(sku, 'SKUImages')
    sku_image = SubElement(sku_images, 'Image')
    sku_image.text = 'sku_image_url_1'
    # Add more SKU images here

    sku_inventory = SubElement(sku, 'SKUInventory')
    inventory_status = SubElement(sku_inventory, 'InventoryStatus')
    inventory_status.text = 'InStock'
    return xml_root

def generate_random_string(length):
    characters = string.ascii_letters + string.digits + string.punctuation

    # Use the 'choices' function to randomly select characters 'length' times
    random_string = ''.join(random.choices(characters, k=length))

    return random_string

def generate_random_number(lower_bound, upper_bound):
    return random.randrange(lower_bound, upper_bound)
# Start timing script execution time
start_time = time.time()

# Define the XSD schema path
xsd_file = 'xml_schema.xsd'

# Load XSD schema
schema = xmlschema.XMLSchema(xsd_file)

NUMBER_OF_FILES_TO_GENERATE = 100

# Download words used for generating ProductName and ProductDescription
nltk.download('words')
english_words = words.words()

# Filter words that are appropriate for product names
PRODUCT_WORDS = [word for word in english_words if len(word) > 3 and word.isalpha()]

for file_number in range(1, NUMBER_OF_FILES_TO_GENERATE + 1):
    #print('Generating file number: ' + str(file_number))

    RANDOM_TRANSACTION_ID = generate_random_number(10000, 30000)
    RANDOM_PRODUCT_ID = generate_random_number(10000, 20000)

    # Create a new XML document based on the XSD schema
    xml_root = Element('data')

    # HeaderData
    xml_root = write_header_data(xml_root, RANDOM_TRANSACTION_ID)

    # ProductData
    xml_root = write_product_data(xml_root, RANDOM_PRODUCT_ID,PRODUCT_WORDS)

    # SKUData
    xml_root = write_sku_data(xml_root, PRODUCT_WORDS)

    # Convert the XML tree to a formatted string
    xml_str = xml.dom.minidom.parseString(tostring(xml_root)).toprettyxml()

    # Save the XML
    file_path = "generated_files/"+ str(RANDOM_PRODUCT_ID) + "_" + str(RANDOM_TRANSACTION_ID) + ".xml"  # Replace with the actual file path

    # Open the file in write mode and save the content
    with open(file_path, 'w') as file:
        file.write(xml_str)

    #print("File number: " + str(file_number) + " saved successfully.")

#Record script execution end time
end_time = time.time()

# Calculate the execution time
execution_time = end_time - start_time

print(f"Execution time: {execution_time:.6f} seconds")