Imports System.IO
Imports System.Security.Cryptography

Public Class syncForm

    'ファイルキー生成関数
    Function GetFileKey(fi As FileInfo) As String
        Try
            Return fi.Length.ToString() & "_" & fi.LastWriteTimeUtc.Ticks.ToString()
        Catch ex As Exception
            Return ""
        End Try
    End Function

    'Hasyuの取得
    Function GetHash(path As String) As String
        Try
            Using sha As SHA256 = SHA256.Create()
                Using fs = File.OpenRead(path)
                    Return BitConverter.ToString(sha.ComputeHash(fs)).Replace("-", "")
                End Using
            End Using
        Catch ex As Exception
            Return ""
        End Try
    End Function


    '同期スタート
    Private Sub startButton_Click(sender As Object, e As EventArgs) Handles startButton.Click
        Try
            If Directory.Exists(backupPath.Text) = False Then
                logList.Items.Add("フォルダを見つかりません - " & backupPath.Text)
                Return
            End If
            If Directory.Exists(sourcePath.Text) = False Then
                logList.Items.Add("フォルダを見つかりません - " & sourcePath.Text)
                Return
            End If
            Dim logStr As String = ""
            If listCheck.Checked = True Then
                logStr = "（ログ表示のみ）"
            End If
            logList.Items.Add(Now.ToShortDateString & " " & Now.ToShortTimeString & " - ファイル名の同期スタート" & logStr)
            '元フォルダ先を辞書化
            Dim sourceDict As New Dictionary(Of String, FileInfo)
            For Each f In Directory.GetFiles(sourcePath.Text, "*", SearchOption.AllDirectories)
                Dim fi As New FileInfo(f)
                Dim key = GetFileKey(fi)

                If Not sourceDict.ContainsKey(key) Then
                    sourceDict.Add(key, fi)
                End If
            Next

            Dim numbs As Integer = 0
            Dim delInt As Integer = 0
            'バックアップフォルダをチェック
            For Each backFile In Directory.GetFiles(backupPath.Text, "*", SearchOption.AllDirectories)
                Dim backFi As New FileInfo(backFile)
                Dim key = GetFileKey(backFi)

                Dim destPath = Path.Combine(sourcePath.Text, backFi.Name)

                ' ① 同名ファイルがある → OK
                If File.Exists(destPath) Then Continue For

                Dim deleteFlag As Boolean = False

                ' ② 名前変更の可能性あり
                If sourceDict.ContainsKey(key) Then
                    Dim newFile = sourceDict(key)
                    Dim oldPath = Path.Combine(backupPath.Text, backFi.Name)
                    Dim newPath = Path.Combine(backupPath.Text, newFile.Name)
                    If File.Exists(newPath) = False Then
                        logList.Items.Add(backFi.Name & "  ---->  " & newFile.Name)
                        numbs = numbs + 1
                        If listCheck.Checked = False Then
                            Try
                                File.Move(oldPath, newPath)
                            Catch ex As Exception
                                logList.Items.Add("Error : " & backFi.Name & "  ---->  " & newFile.Name)
                                logList.Items.Add(ex.ToString)
                            End Try
                        End If
                    Else
                        deleteFlag = True
                    End If
                Else
                    deleteFlag = True
                End If

                If deleteFlag = True Then
                    Dim newFile = sourceDict(key)
                    'Dim hash1 As String = GetHash(oldPath)
                    'Dim hash2 As String = GetHash(newPath)
                    'If hash1 <> "" AndAlso hash2 <> "" AndAlso hash1 = hash2 Then
                    logList.Items.Add(backFi.Name & "  ---->  delete - 同名ファイル：" & newFile.Name)
                    delInt = delInt + 1
                    If listCheck.Checked = False Then
                        Try
                            File.Delete(backFile)
                        Catch ex As Exception
                            logList.Items.Add("Error : " & backFi.Name & "  ---->  delete")
                            logList.Items.Add(ex.ToString)
                        End Try

                    End If
                    'End If
                End If
            Next
            If numbs <> 0 Then
                logList.Items.Add(Now.ToShortDateString & " " & Now.ToShortTimeString & " - " & numbs & "個のファイル名を同期" & logStr)
            End If
            If delInt <> 0 Then
                logList.Items.Add(Now.ToShortDateString & " " & Now.ToShortTimeString & " - " & delInt & "個のファイルを削除" & logStr)
            End If
            logList.Items.Add(Now.ToShortDateString & " " & Now.ToShortTimeString & " - 処理終了" & logStr)

        Catch ex As Exception
            logList.Items.Add(Now.ToShortDateString & " " & Now.ToShortTimeString & " - エラー発生")
            logList.Items.Add(ex.ToString)
        End Try
    End Sub


End Class
