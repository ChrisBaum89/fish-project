class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  has_many :fish
end
