class CategoriesController < ApplicationController

  def index
    categories = Category.all
    options = {
      include: [:fish]
    }
    render json: CategorySerializer.new(categories, options)
  end

  def show
    category = Category.find(params[:id])
    options = {
      include: [:fish]
    }
    render json: CategorySerializer.new(category, options)
  end

end
