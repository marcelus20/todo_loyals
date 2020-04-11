
import requests
import json

base_url = 'http://34.244.241.179:3000/api';

headers = {
	"__token__":"XNnzXyVCMO0tUzyGp4NNWMOM7zrVcZUnmOeOVaF8Qdl1AlcnpB"
}


def create_card(uuid):
	global base_url
	create_card = base_url + "/customers/cards"
	global headers
	return requests.post(create_card, headers=headers, json={'uuid':uuid}).json()

def create_transactions(uuid, value):
	global base_url
	get_transactions = base_url + "/transactions/" + str(value)
	global headers
	return requests.post(get_transactions, headers=headers, json={'uuid':uuid}).json()


######GET

def get_transactions(uuid=""):
	global base_url
	get_transactions = base_url + "/transactions/" + uuid
	global headers
	return requests.get(get_transactions, headers=headers).json()



def get_cards():
	global base_url
	get_cards = base_url + "/cards"
	global headers
	return requests.get(get_cards, headers=headers).json()


def get_balance(uuid):
	global base_url
	get_balance = base_url + "/balance/" + uuid
	global headers
	return requests.get(get_balance, headers=headers).json()


#print(get_cards())
#print(create_card(uuidPleaseWork))
#print(create_transactions(uuidPleaseWork, 1))
# print(create_transactions('A_____U____A',20))
# print(create_transactions('A_____U____A',20))
# print(create_transactions('A_____U____A',-10))
# print(get_transactions())
# print(get_transactions('A_____U____A'))
##print(get_balance(uuidPleaseWork))
