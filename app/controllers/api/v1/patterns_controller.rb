class Api::V1::PatternsController < ApiController
  before_action :authorize_user, except: %i[index show create update]
  before_action :authenticate_user!, except: %i[index show]

  def index
    render json: { patterns: Pattern.all }
  end

  def show
    pattern = Pattern.find(params[:id])

    render json: { pattern: pattern }
  end

  def create
    new_pattern = Pattern.create!(pattern_parmas)
    render json: new_pattern
  end

  def pattern_params
    params.require(:pattern).permit(
      :name, :right_hand, :left_hand, :subdivision,
      :time_repeated, :is_alt
    )
  end
end
