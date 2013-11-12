require 'bundler/setup'
require 'active_support/all'
require 'json'
require 'sinatra'
require 'sinatra/json'

todos = [
  {id: 1, title: 'Learn Ember.js', isCompleted: true},
  {id: 2, title: '...',            isCompleted: false},
  {id: 3, title: 'Profit!',        isCompleted: false}
]

get '/' do
  send_file "#{settings.public_dir}/index.html"
end

get '/todos' do
  json todos: todos
end

post '/todos' do
  payload = JSON.parse(request.body.read).with_indifferent_access
  last_id = todos.map {|todo| todo[:id] }.max || 0
  todo    = payload[:todo].merge(id: last_id.succ)

  todos << todo

  status 201
  json todo: todo
end

put '/todos/:id' do |id|
  not_found unless todo = todos.find {|todo| todo[:id] == id.to_i }

  payload = JSON.parse(request.body.read).with_indifferent_access

  todo.update payload[:todo]

  json todo: todo
end

delete '/todos/:id' do |id|
  not_found unless todo = todos.find {|todo| todo[:id] == id.to_i }

  todos.delete todo

  ''
end
