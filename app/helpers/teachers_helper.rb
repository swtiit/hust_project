module TeachersHelper
  def total_class_studied teacher
    teacher.teach_offers.approved.size
  end

  def avg_rate teacher
    teacher.average("point").avg.round Settings.num_round_rate
  end
end