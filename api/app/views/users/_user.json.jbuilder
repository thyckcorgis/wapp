json.extract! user, :id, :username, :name, :daily, :timezone, :created_at, :updated_at
json.url user_url(user, format: :json)
