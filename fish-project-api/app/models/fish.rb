class Fish < ApplicationRecord
  belongs_to :category
  has_many :reviews
end
