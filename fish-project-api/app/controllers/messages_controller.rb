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

  def create
    @message = Message.new(
      firstname: params[:firstname],
      lastname: params[:lastname],
      email: params[:email],
      phonenumber: params[:phonenumber],
      messagetext: params[:messagetext]
    )
    binding.pry
    #@message.save
    #redirect_to message_path(@message)
  end
end
