class ReviewsController < ApplicationController
  def index
    reviews = Review.all
    options = {
      include: [:name, :reviewtext, :stars]
    }
    render json: ReviewSerializer.new(messages)
  end
end
