class FishController < ApplicationController

  def index
    fish = Fish.all
    render json: FishSerializer.new(fish)
  end

  def show
    fish = Fish.find(params[:id])
    render json: FishSerializer.new(fish)
  end

end
