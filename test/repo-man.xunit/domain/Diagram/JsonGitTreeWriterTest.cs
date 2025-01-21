using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using repo_man.domain.FileSystem;
using repo_man.xunit._extensions;

namespace repo_man.xunit.domain.Diagram
{
    public class JsonGitTreeWriterTest : TestBase
    {
        [Fact]
        public async Task WriteTreeToFile()
        {
            // Arrange
            var expectedContent = "const repoInfo = {\"name\":\"\",\"files\":[{\"name\":\"readme.md\",\"size\":100,\"commits\":1,\"lastCommit\":0}],\"folders\":[]};";
            var expectedFilePath = "C:\\Temp\\output.json";
            _mocker.GetMock<IConfiguration>().Setup(c => c["GitTreeJsonFile"]).Returns(expectedFilePath);
            var tree = new GitTree();
            tree.AddFile("readme.md", 100, [new Commit("123456", DateTimeOffset.Now, "Bob", "Hello")]);
            _mocker.GetMock<ITreeExtracter>().Setup(t => t.GetFileTree()).Returns(tree);
            var target = _mocker.CreateInstance<JsonGitTreeWriter>();
            
            // Act
            await target.WriteTreeToFile(tree);

            // Assert
            _mocker.Verify<IFileSystem>(fs => fs.WriteTextToFileAsync(expectedContent, expectedFilePath));
        }

        [Fact]
        public async Task LogsErrorWhenNoConfigFileNameProvided()
        {
            _mocker.GetMock<IConfiguration>().Setup(c => c["GitTreeJsonFile"]).Returns(null as string);

            var target = _mocker.CreateInstance<JsonGitTreeWriter>();
            var tree = new GitTree();
            await target.WriteTreeToFile(tree);

            _mocker.GetMock<ILogger<JsonGitTreeWriter>>().VerifyErrorWasCalled(msg => msg == "Invalid output filename. GitTreeJsonFile configuration value must be provided.", Times.Once());

            _mocker.Verify<IFileSystem>(fs => fs.WriteTextToFileAsync(It.IsAny<string>(), It.IsAny<string>()), Times.Never());
        }
    }
}
