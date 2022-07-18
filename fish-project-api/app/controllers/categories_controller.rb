class CategoriesController < ApplicationController

  def index
    categories = Category.all
    options = {
      include: [:fish]
    }
    render json: categories.to_json(only: [:id, :name, :description], include: {fish:{include: {reviews: {}}}})
  end

  def show
    category = Category.find(params[:id])
    #binding.pry
    options = {
      include: [:fish]
    }
    #render json: CategorySerializer.new(category, options)
    render json: category.to_json(only: [:id, :name, :description], include: {fish:{include: {reviews: {}}}})
  end

end
