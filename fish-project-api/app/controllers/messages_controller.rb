class MessagesController < ApplicationController
  def index
    messages = Message.all
    options = {
      include: [:firstname, :lastname, :email, :phonenumber, :messagetext]
    }
    render json: MessageSerializer.new(messages)
  end

  def show
    message = Message.find(params[:id])
    options = {
      include: [:firstname, :lastname, :email, :phonenumber, :messagetext]
    }
    render json: MessageSerializer.new(message)
  end

end
