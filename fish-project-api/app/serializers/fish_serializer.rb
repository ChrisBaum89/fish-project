class FishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :size, :category_id
  belongs_to :category
end
