﻿using repo_man.domain.Git;

namespace repo_man.domain.CodeQuality;

public interface ICodeQualityAnalyst
{
    Task<string> EvaluateCodeQuality(GitTree commitHistory);
}