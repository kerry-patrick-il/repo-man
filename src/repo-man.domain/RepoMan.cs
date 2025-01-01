using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using repo_man.domain.CodeQuality;
using repo_man.domain.Diagram;

namespace repo_man.domain;

public class RepoMan
{
    private readonly IConfiguration _config;
    private readonly ILogger<RepoMan> _logger;
    private readonly RepositoryVisualizer _repoVisualizer;
    private readonly RepositoryReviewer _repoReviewer;
    private readonly HtmlRepositoryVisualizer _htmlRepoVisualizer;

    public RepoMan(IConfiguration config, ILogger<RepoMan> logger, RepositoryVisualizer repoVisualizer, RepositoryReviewer repoReviewer,
        HtmlRepositoryVisualizer htmlRepoVisualizer)
    {
        _config = config;
        _logger = logger;
        _repoVisualizer = repoVisualizer;
        _repoReviewer = repoReviewer;
        _htmlRepoVisualizer = htmlRepoVisualizer;
    }

    public async Task Run()
    {
        //_logger.LogInformation($"Endpoint: {_config["ollama:endpoint"]}");
        //_logger.LogInformation($"Endpoint: {_config["ollama:model"]}");

        var action = (_config["action"] ?? "").ToLower();

        if (action == "diagram")
        {
            await _repoVisualizer.GenerateDiagram();
        }
        else if (action == "review")
        {
            await _repoReviewer.ReviewCodeQuality();
        }
        else if (action == "html")
        {
            await _htmlRepoVisualizer.GenerateDiagram();
        }
        else
        {
            _logger.LogError("Unknown action requested. No support for action '{action}'", action);
        }
    }
}