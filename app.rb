require 'rubygems'
require 'sinatra'
require 'json'

# get the index page
get "/" do
  erb :index
end

# create a new somethingelseething
put '/something' do
  render :form
end

# update a something
post '/somethingelse' do
end

# delete a something
delete '/somethingelse' do
end