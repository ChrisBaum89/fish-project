class FishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :description, :size, :img_url, :category_id, :price, :number_in_stock
  belongs_to :category
end
