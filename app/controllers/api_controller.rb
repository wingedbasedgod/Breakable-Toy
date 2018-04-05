# Prevent CSRF attacks by raising an exception.
class ApiController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
end
