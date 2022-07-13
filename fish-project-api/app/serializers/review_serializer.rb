class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :reviewtext, :stars, :fish_id, :created_at, :updated_at
  belongs_to :fish
end
