class FishController < ApplicationController

  def index
    fishes = Fish.all
    render json: FishSerializer.new(fishes)
  end

  def show
    fish = Fish.find_by_id(params[:id])
    render json: fish.to_json(only: [:name, :description, :size, :img_url, :category_id])
  end

end
