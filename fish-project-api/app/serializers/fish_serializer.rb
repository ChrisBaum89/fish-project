class FishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :size, :img_url, :category_id
  belongs_to :category
end
