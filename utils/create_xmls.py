import xml.etree.ElementTree as ET

def generate_xml(attribute_names, attribute_types, attribute_values):
    root = ET.Element('product')
    
    for name, typ, value in zip(attribute_names, attribute_types, attribute_values):
        element = ET.SubElement(root, name)
        element.text = f'{value}'
    
    tree = ET.ElementTree(root)
    tree.write('output.xml', encoding='utf-8', xml_declaration=True)

# Example usage
attribute_names = ['ProductID','UniqueTransactionID', 'address']
attribute_types = ['str', 'int', 'str']
attribute_values = ['1', '101', 'VD9']

generate_xml(attribute_names, attribute_types, attribute_values)