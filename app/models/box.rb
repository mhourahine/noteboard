class Box < ActiveRecord::Base
	after_initialize :defaults

private
	def defaults
		self.title ||= ''
		self.content ||= ''
		self.top ||= 0
		self.left ||= 0
		self.height ||= 100
		self.width ||= 100
	end
end
