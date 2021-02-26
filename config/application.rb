require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TrackMyTrainings
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # uuid instead of integer ID
    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end

    # Sidekiq
    # nil will use the "default" queue
    # some of these options will not work with your Rails version
    # add/remove as necessary
    config.action_mailer.deliver_later_queue_name = nil # defaults to "mailers"
    config.active_storage.queues.analysis   = nil       # defaults to "active_storage_analysis"
    config.active_storage.queues.purge      = nil       # defaults to "active_storage_purge"
    config.active_storage.queues.mirror     = nil       # defaults to "active_storage_mirror"

    config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }
  end
end
