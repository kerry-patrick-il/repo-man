﻿using Microsoft.Extensions.DependencyInjection;
using repo_man.domain.Diagram;
using repo_man.domain.Git;
using repo_man.infrastructure.FileSys;
using repo_man.infrastructure.GitFileSys;

namespace repo_man.infrastructure.DependencyInjection
{
    public static class Bootstrapper
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddTransient<IGitRepoCrawler, LibGit2SharpGitRepoCrawler>();
            services.AddTransient<IFileWriter, WindowsFileWriter>();
            return services;
        }
    }
}
