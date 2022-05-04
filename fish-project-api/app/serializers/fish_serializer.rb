class FishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :size, :img_url, :price, :number_in_stock
  belongs_to :category
end
