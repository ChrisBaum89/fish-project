class ReviewsController < ApplicationController
  def index
    reviews = Review.all
    options = {
      include: [:name, :reviewtext, :stars, :fish_id, :timestamps, :created_at, :updated_at]
    }
    render json: ReviewSerializer.new(reviews)
  end

  def show
    review = Review.find(params[:id])
    options = {
      include: [:name, :reviewtext, :stars, :fish_id, :timestamps, :created_at, :updated_at]
    }
    render json: ReviewSerializer.new(review)
  end

  def create
    @review = Review.new(
      name: params[:name],
      reviewtext: params[:reviewtext],
      stars: params[:stars],
      fish_id: params[:fish_id]
    )
    @review.save
    render json: ReviewSerializer.new(@review)
  end
end
