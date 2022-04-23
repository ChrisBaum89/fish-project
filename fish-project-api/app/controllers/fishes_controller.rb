class FishesController < ApplicationController

  def index
    fish = Fish.all
    render json: FishSerializer.new(fish)
  end

  def show
    fish = Fish.find_by_id(params[:id])
    render json: FishSerializer.new(fish)
  end

end
