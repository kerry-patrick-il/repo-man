using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using repo_man.domain.FileSystem;

namespace repo_man.domain.Git;

public class JsonGitTreeWriter(IConfiguration config, IFileSystem fileSystem, ILogger<JsonGitTreeWriter> logger)
{
    public virtual async Task WriteTreeToFile(GitTree tree)
    {
        var json = GetTreeAsJson(tree);

        var codeFileText = $"const repoInfo = {json};";

        var fileName= config["GitTreeJsonFile"];
        if (string.IsNullOrEmpty(fileName))
        {
            logger.LogError("Invalid output filename. GitTreeJsonFile configuration value must be provided.");
            return;
        }

        await fileSystem.WriteTextToFileAsync(codeFileText, fileName!);
    }

    private string GetTreeAsJson(GitTree tree)
    {
        var treeOutput = new
        {
            tree.Name,
            Files = tree.Files.Select(ToJsonGitFile).ToArray(),
            Folders = tree.Folders.Select(ToJsonGitFolder).ToArray()
        };

        var json = JsonSerializer.Serialize(treeOutput, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        return json;
    }

    private JsonGitFolder ToJsonGitFolder(GitFolder f)
    {
        return new JsonGitFolder(
            f.Name,
            f.Files.Select(ToJsonGitFile).ToArray(),
            f.Folders.Select(ToJsonGitFolder).ToArray());
    }

    private JsonGitFile ToJsonGitFile(GitFile file)
    {
        return new JsonGitFile(
            file.Name,
            file.FileSize,
            file.Commits.Count,
            (DateTimeOffset.UtcNow - (file.Commits.Max(c => c.CommitDate) ?? DateTimeOffset.UtcNow)).Days
        );
    }
}

public class JsonGitFile(string name, long size, int commits, int lastCommit)
{
    [UsedImplicitly]
    public string Name { get; } = name;

    [UsedImplicitly]
    public long Size { get; } = size;

    [UsedImplicitly]
    public int Commits { get; } = commits;

    [UsedImplicitly]
    public int LastCommit { get; } = lastCommit;
}

public class JsonGitFolder(string name, JsonGitFile[] files, JsonGitFolder[] folders)
{
    [UsedImplicitly]
    public string Name { get; } = name;

    [UsedImplicitly]
    public JsonGitFile[] Files { get; } = files;

    [UsedImplicitly]
    public JsonGitFolder[] Folders { get; } = folders;
}
