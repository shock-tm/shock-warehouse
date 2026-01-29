<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class syncForm
    Inherits System.Windows.Forms.Form

    'フォームがコンポーネントの一覧をクリーンアップするために dispose をオーバーライドします。
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Windows フォーム デザイナーで必要です。
    Private components As System.ComponentModel.IContainer

    'メモ: 以下のプロシージャは Windows フォーム デザイナーで必要です。
    'Windows フォーム デザイナーを使用して変更できます。  
    'コード エディターを使って変更しないでください。
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.sourcePath = New System.Windows.Forms.TextBox()
        Me.backupPath = New System.Windows.Forms.TextBox()
        Me.startButton = New System.Windows.Forms.Button()
        Me.logList = New System.Windows.Forms.ListBox()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.listCheck = New System.Windows.Forms.CheckBox()
        Me.SuspendLayout()
        '
        'sourcePath
        '
        Me.sourcePath.Location = New System.Drawing.Point(84, 22)
        Me.sourcePath.Margin = New System.Windows.Forms.Padding(3, 2, 3, 2)
        Me.sourcePath.Name = "sourcePath"
        Me.sourcePath.Size = New System.Drawing.Size(545, 22)
        Me.sourcePath.TabIndex = 0
        Me.sourcePath.Text = "C:\Videos"
        '
        'backupPath
        '
        Me.backupPath.Location = New System.Drawing.Point(84, 66)
        Me.backupPath.Margin = New System.Windows.Forms.Padding(3, 2, 3, 2)
        Me.backupPath.Name = "backupPath"
        Me.backupPath.Size = New System.Drawing.Size(545, 22)
        Me.backupPath.TabIndex = 1
        Me.backupPath.Text = "D:\Videos"
        '
        'startButton
        '
        Me.startButton.Font = New System.Drawing.Font("MS UI Gothic", 16.0!)
        Me.startButton.Location = New System.Drawing.Point(657, 22)
        Me.startButton.Margin = New System.Windows.Forms.Padding(3, 2, 3, 2)
        Me.startButton.Name = "startButton"
        Me.startButton.Size = New System.Drawing.Size(131, 52)
        Me.startButton.TabIndex = 2
        Me.startButton.Text = "Start"
        Me.startButton.UseVisualStyleBackColor = True
        '
        'logList
        '
        Me.logList.Anchor = CType((((System.Windows.Forms.AnchorStyles.Top Or System.Windows.Forms.AnchorStyles.Bottom) _
            Or System.Windows.Forms.AnchorStyles.Left) _
            Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.logList.FormattingEnabled = True
        Me.logList.ItemHeight = 15
        Me.logList.Location = New System.Drawing.Point(23, 121)
        Me.logList.Margin = New System.Windows.Forms.Padding(3, 2, 3, 2)
        Me.logList.Name = "logList"
        Me.logList.Size = New System.Drawing.Size(765, 274)
        Me.logList.TabIndex = 3
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(20, 26)
        Me.Label1.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(64, 15)
        Me.Label1.TabIndex = 4
        Me.Label1.Text = "source : "
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(20, 70)
        Me.Label2.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(64, 15)
        Me.Label2.TabIndex = 5
        Me.Label2.Text = "backup : "
        '
        'listCheck
        '
        Me.listCheck.AutoSize = True
        Me.listCheck.Checked = True
        Me.listCheck.CheckState = System.Windows.Forms.CheckState.Checked
        Me.listCheck.Location = New System.Drawing.Point(657, 85)
        Me.listCheck.Margin = New System.Windows.Forms.Padding(4)
        Me.listCheck.Name = "listCheck"
        Me.listCheck.Size = New System.Drawing.Size(115, 19)
        Me.listCheck.TabIndex = 6
        Me.listCheck.Text = "リスト表示のみ"
        Me.listCheck.UseVisualStyleBackColor = True
        '
        'syncForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(8.0!, 15.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(800, 422)
        Me.Controls.Add(Me.listCheck)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.logList)
        Me.Controls.Add(Me.startButton)
        Me.Controls.Add(Me.backupPath)
        Me.Controls.Add(Me.sourcePath)
        Me.Margin = New System.Windows.Forms.Padding(3, 2, 3, 2)
        Me.Name = "syncForm"
        Me.Text = "ファイル名同期"
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents sourcePath As TextBox
    Friend WithEvents backupPath As TextBox
    Friend WithEvents startButton As Button
    Friend WithEvents logList As ListBox
    Friend WithEvents Label1 As Label
    Friend WithEvents Label2 As Label
    Friend WithEvents listCheck As CheckBox
End Class
