json.extract! log, :id, :time, :amount, :user_id, :created_at, :updated_at
json.url log_url(log, format: :json)
