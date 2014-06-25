require 'spec_helper'

describe Skill do
  it { should belong_to(:project) }
end
