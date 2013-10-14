class BoxesController < ApplicationController
	before_action :set_box, only: [:show, :update, :destroy]

	def index
		@boxes = Box.all
		
		respond_to do |format|
			format.json { render json: @boxes, status: :ok }
		end	
	end

	def show
	end

	def create
		@box = Box.new(box_params)

		respond_to do |format|
		  if @box.save
		    format.html { redirect_to @box, notice: 'Box was successfully created.' }
		    format.json { render json: @box, status: :created, location: @box }
		  else
		    format.html { render action: 'new' }
		    format.json { render json: @box.errors, status: :unprocessable_entity }
		  end
		end
	end

	def update
		respond_to do |format|
		  if @box.update(box_params)
		    format.html { redirect_to @widget_set, notice: 'Box was successfully updated.' }
		    format.json { head :no_content }
		  else
		    format.html { render action: 'edit' }
		    format.json { render json: @box.errors, status: :unprocessable_entity }
		  end
		end
	end

	def destroy
		@box.destroy
		respond_to do |format|
		  format.html { redirect_to widget_sets_url }
		  format.json { head :no_content }
		end
	end

private

	def set_box
		@box = Box.find(params[:id])
	end

	# Never trust parameters from the scary internet, only allow the white list through.
    def box_params
      params.require(:box).permit(:title, :content, :width, :height, :top, :left)
    end
end
