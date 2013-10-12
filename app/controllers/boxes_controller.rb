class BoxesController < ApplicationController

	def index
		@boxes = Box.all
		
		respond_to do |format|
			format.json { render json: @boxes, status: :ok }
		end	
	end

end
