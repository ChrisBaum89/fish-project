class FishController < ApplicationController

  def index
    fish = Fish.all
    render json: fish.to_json(only: [:name, :description, :size, :img_url, :category_id, :number_in_stock, :price])
  end

  def show
    fish = Fish.find_by_id(params[:id])
    render json: fish.to_json(only: [:name, :description, :size, :img_url, :category_id, :number_in_stock, :price])
  end

end
