class Demand < ApplicationRecord
  belongs_to :user
  has_many :teach_offers, dependent: :destroy
  has_many :invite_items, dependent: :destroy
  belongs_to :province
  belongs_to :district
  has_many :invites, through: :invite_items

  validates :subject, :title, presence: true, length: {maximum: 100}
  validates :number_student, :fee, presence: true, numericality: { only_integer: true }
  validates :time_per_session, :level_class, :note, :address_detail, presence: true

  enum status: {pending: 0, approved: 1, unapproved: 2}
  enum status_teach: {found: 1, notFound: 0}

  delegate :name, :phone, :email, :avatar, to: :user, prefix: true
  delegate :name, to: :province, prefix: true
  delegate :name, to: :district, prefix: true

  default_scope {order created_at: :desc }
  scope :demand_approved, -> {where status: 1}
  scope :good_demand, ->(user) { where(province_id: user.teacher.province_id, district_id: user.teacher.district_id) }

  def self.to_csv
    attributes = %w{user_name user_email user_phone title subject level_class number_student time_per_session fee address_detail district_name province_name}
    header = attributes.map { |attr| I18n.t("#{attr}") }

    CSV.generate do |csv|
      csv << header
      all.each do |demand|
        csv << attributes.map{ |attr| demand.public_send(attr) }
      end
    end
  end
end
