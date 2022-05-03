class CartSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :fish_id
end
