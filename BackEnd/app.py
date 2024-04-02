from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

# Configuración de la conexión a MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['test_database']
collection = db['test_collection']

# Rutas

@app.route('/api/items', methods=['GET'])
def get_items():
    items = list(collection.find())
    # Convertir ObjectId a cadenas
    for item in items:
        item['_id'] = str(item['_id'])
    return jsonify(items)

@app.route('/api/items/<id>', methods=['GET'])
def get_item(id):
    item = collection.find_one({'_id': ObjectId(id)})
    if item:
        # Convertir ObjectId a cadena
        item['_id'] = str(item['_id'])
        return jsonify(item)
    else:
        return jsonify({'error': 'Elemento no encontrado'}), 404


@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.json
    item_id = collection.insert_one(data).inserted_id
    return jsonify({'id': str(item_id)}), 201

@app.route('/api/items/<id>', methods=['PUT'])
def update_item(id):
    data = request.json
    result = collection.update_one({'_id': ObjectId(id)}, {'$set': data})
    if result.modified_count == 1:
        return jsonify({'message': 'Elemento actualizado correctamente'})
    else:
        return jsonify({'error': 'Elemento no encontrado'}), 404

@app.route('/api/items/<id>', methods=['DELETE'])
def delete_item(id):
    result = collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Elemento eliminado correctamente'})
    else:
        return jsonify({'error': 'Elemento no encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)
