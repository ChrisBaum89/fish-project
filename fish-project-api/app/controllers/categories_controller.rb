class CategoriesController < ApplicationController

  def index
    categories = Category.all
    render json: CategorySerializer.new(categories)
  end

  def show
    category = Category.find(params[:id])
    render json: CategorySerializer.new(category)
  end

end
