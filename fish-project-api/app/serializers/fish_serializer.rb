class FishSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  belongs_to :category
end
