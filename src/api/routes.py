"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    # 'password' -> 'SSDFDSGKSDJGLKHDFGKHSDLKH353543TKJDFGHDFJKGDSFKLGJ'
    error = None
    data = None

    if not email or not password:
        error = "Need to provide email and password"

    try:
        # password_hash = bcrypt.generate_password_hash(password)
        new_user = User(
            email=email,
            password=password,
            is_active=True
        ) 
        db.session.add(new_user)
        db.session.commit()

        jwt_token = create_access_token(identity=new_user.id)
        data = jwt_token
    except:
        error = "Internal server error"

    response_body = {
        "data": data,
        "error": error
    }

    status_code = 200 if not error else 500

    return jsonify(response_body), status_code
