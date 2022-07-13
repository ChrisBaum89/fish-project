class FishController < ApplicationController

  def index
    fish = Fish.all
    options = {
      include: [:reviews]
    }
    render json: fish.to_json(only: [:id, :name, :description, :size, :img_url, :category_id, :number_in_stock, :price], include: {reviews: []})
  end

  def show
    fish = Fish.find_by_id(params[:id])
    options = {
      include: [:reviews]
    }
    render json: fish.to_json(only: [:name, :description, :size, :img_url, :category_id, :number_in_stock, :price, :reviews], include: {reviews: []})
  end

end
